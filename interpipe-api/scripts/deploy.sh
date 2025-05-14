#!/bin/bash

# Deployment script for Interpipe API
# This script should be run on the DigitalOcean Droplet

set -e

APP_NAME="interpipe-api"
APP_DIR="/var/www/$APP_NAME"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$APP_DIR/backups"
RELEASE_DIR="$APP_DIR/releases/$TIMESTAMP"

echo "📦 Starting deployment of $APP_NAME..."

# Create necessary directories
mkdir -p $BACKUP_DIR
mkdir -p $RELEASE_DIR

# Backup current deployment if it exists
if [ -L "$APP_DIR/current" ] && [ -d "$APP_DIR/current" ]; then
  echo "🔄 Backing up current deployment..."
  cp -r $APP_DIR/current/* $BACKUP_DIR/
fi

# Extract deployment package
echo "📂 Extracting deployment package..."
tar -xzf $APP_DIR/deployment.tar.gz -C $RELEASE_DIR

# Install production dependencies
echo "📚 Installing dependencies..."
cd $RELEASE_DIR
npm ci --production

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Apply database migrations if needed (uncomment if you want to run migrations during deployment)
# echo "🔄 Running database migrations..."
# npx prisma migrate deploy

# Update symlink
echo "🔗 Updating symlink..."
ln -sfn $RELEASE_DIR $APP_DIR/current

# Restart or start the application with PM2
echo "🚀 Restarting application..."
cd $APP_DIR/current
pm2 restart $APP_NAME 2>/dev/null || pm2 start dist/index.js --name $APP_NAME

# Clean up
echo "🧹 Cleaning up..."
rm -f $APP_DIR/deployment.tar.gz

# Keep only the 3 most recent backups
echo "🗑️ Removing old backups..."
ls -dt $BACKUP_DIR/* | tail -n +4 | xargs rm -rf

echo "✅ Deployment completed successfully!" 