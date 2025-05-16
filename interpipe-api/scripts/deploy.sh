#!/bin/bash

# Deployment script for Interpipe API
# This script should be run on the DigitalOcean Droplet

set -e

# Deployment script for Interpipe API
DEPLOY_PATH=${DEPLOY_PATH:-/var/www/interpipe-api}
TIMESTAMP=$(date +%Y%m%d%H%M%S)
RELEASE_PATH="$DEPLOY_PATH/releases/$TIMESTAMP"
CURRENT_PATH="$DEPLOY_PATH/current"
BACKUP_PATH="$DEPLOY_PATH/backups/$TIMESTAMP"
TARBALL="$DEPLOY_PATH/deployment.tar.gz"
ENV_FILE="$DEPLOY_PATH/.env"
UPLOADS_PATH="$DEPLOY_PATH/uploads"

# Source NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Starting deployment to $DEPLOY_PATH..."

# Clean up all previous releases for a fresh start
echo "Cleaning up previous releases..."
rm -rf "$DEPLOY_PATH/releases/"*

# Check if deployment package exists
if [ ! -f "$TARBALL" ]; then
  echo "Error: Deployment package not found at $TARBALL"
  exit 1
fi

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at $ENV_FILE"
  exit 1
fi

# Create release directory
mkdir -p "$RELEASE_PATH"
echo "Created release directory: $RELEASE_PATH"

# Extract the tarball to the release directory
echo "Extracting deployment package..."
tar -xzf "$TARBALL" -C "$RELEASE_PATH"

# Copy environment variables
echo "Copying environment variables..."
cp "$ENV_FILE" "$RELEASE_PATH/.env"

# Backup current version if it exists
if [ -d "$CURRENT_PATH" ]; then
  echo "Backing up current version..."
  mkdir -p "$BACKUP_PATH"
  cp -r "$CURRENT_PATH"/* "$BACKUP_PATH"
fi

# Ensure uploads directory exists and is preserved
echo "Ensuring uploads directory is preserved..."
mkdir -p "$UPLOADS_PATH"

# Create subdirectories for different upload types
mkdir -p "$UPLOADS_PATH/general"
mkdir -p "$UPLOADS_PATH/image"
mkdir -p "$UPLOADS_PATH/document"

# If the current version has an uploads directory with content, preserve it
if [ -d "$CURRENT_PATH/uploads" ]; then
  echo "Copying existing uploads to permanent storage..."
  
  # Copy each upload type directory if it exists
  for dir in general image document; do
    if [ -d "$CURRENT_PATH/uploads/$dir" ] && [ "$(ls -A "$CURRENT_PATH/uploads/$dir" 2>/dev/null)" ]; then
      echo "Copying $dir uploads..."
      mkdir -p "$UPLOADS_PATH/$dir"
      cp -r "$CURRENT_PATH/uploads/$dir/"* "$UPLOADS_PATH/$dir/" 2>/dev/null || true
    fi
  done
fi

# Create symlink to the uploads directory in the release
echo "Creating symlink for uploads directory..."
rm -rf "$RELEASE_PATH/uploads"
ln -sfn "$UPLOADS_PATH" "$RELEASE_PATH/uploads"

# Install dependencies
echo "Installing dependencies..."
cd "$RELEASE_PATH"
# Ensure Node.js is available
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"
npm ci --production

# Run database migrations
echo "Running database migrations..."
npx prisma generate
npx prisma migrate deploy

# Update symlink
echo "Updating symlink..."
ln -sfn "$RELEASE_PATH" "$CURRENT_PATH"

# Restart or start the application with PM2
if command -v pm2 >/dev/null 2>&1; then
  if pm2 list | grep -q interpipe-api; then
    echo "Restarting application with PM2..."
    pm2 reload interpipe-api
  else
    echo "Starting application with PM2..."
    cd "$CURRENT_PATH"
    pm2 start dist/index.js --name interpipe-api
  fi
else
  echo "PM2 is not installed. Installing PM2..."
  npm install -g pm2
  echo "Starting application with PM2..."
  cd "$CURRENT_PATH"
  pm2 start dist/index.js --name interpipe-api
fi

# Clean up
echo "Cleaning up..."
rm -f "$TARBALL"

# Keep only the last 5 backups
echo "Removing old backups..."
cd "$DEPLOY_PATH/backups"
ls -t | tail -n +6 | xargs -r rm -rf

# Keep only the last 5 releases
echo "Removing old releases..."
cd "$DEPLOY_PATH/releases"
ls -t | tail -n +6 | xargs -r rm -rf

echo "Deployment completed successfully!" 