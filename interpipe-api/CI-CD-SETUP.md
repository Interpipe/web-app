# CI/CD Setup Guide for Interpipe API

This guide explains how to set up the CI/CD pipeline for the Interpipe API project using GitHub Actions and a DigitalOcean Droplet.

## Prerequisites

1. A GitHub repository for the project
2. A DigitalOcean account
3. A DigitalOcean Droplet with Ubuntu

## Step 1: Set Up Your DigitalOcean Droplet

1. Create a new Ubuntu Droplet on DigitalOcean
2. Connect to your Droplet via SSH
3. Install the required dependencies:

```bash
# Update packages
apt update && apt upgrade -y

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js using NVM
nvm install 20
nvm use 20
nvm alias default 20

# Install PM2 for process management
npm install -g pm2

# Install required build tools
apt install -y build-essential
```

4. Create a deploy directory for the application:

```bash
mkdir -p /var/www/interpipe-api
```

## Step 2: Set Up SSH Keys for GitHub Actions

1. Generate a new SSH key pair on your local machine:

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github-actions
```

2. Add the public key to your Droplet's authorized keys:

```bash
# On your local machine
cat ~/.ssh/github-actions.pub | ssh root@YOUR_DROPLET_IP "cat >> ~/.ssh/authorized_keys"
```

3. Copy the private key for use in GitHub Secrets:

```bash
cat ~/.ssh/github-actions
```

## Step 3: Configure Environment Variables on Your Droplet

Create a `.env` file in your deployment directory:

```bash
nano /var/www/interpipe-api/.env
```

Add the necessary environment variables:

```
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
# Add any other required environment variables
```

## Step 4: Configure GitHub Secrets

In your GitHub repository, go to Settings > Secrets and Variables > Actions and add the following secrets:

1. `SSH_PRIVATE_KEY`: The SSH private key generated in Step 2
2. `DROPLET_IP`: Your DigitalOcean Droplet's IP address
3. `DEPLOY_PATH`: The path to your deployment directory (e.g., `/var/www/interpipe-api`)

## Step 5: Push the GitHub Workflow File

The CI/CD workflow file is already in your repository at `.github/workflows/ci-cd.yml`. Make sure it's committed and pushed to your repository.

## Step 6: Verify the Deployment

After pushing to the main branch, GitHub Actions will:

1. Run tests (if configured)
2. Build the application
3. Deploy the application to your DigitalOcean Droplet

You can check the status of the workflow in the "Actions" tab of your GitHub repository.

## Optional: Set Up Nginx as a Reverse Proxy

For production environments, it's recommended to set up Nginx as a reverse proxy:

```bash
# Install Nginx
apt install -y nginx

# Create a new Nginx configuration
nano /etc/nginx/sites-available/interpipe-api
```

Add the following configuration:

```
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;  # Adjust port if needed
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration:

```bash
ln -s /etc/nginx/sites-available/interpipe-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Troubleshooting

If your deployment fails:

1. Check the GitHub Actions logs for errors
2. Verify that your SSH key has been properly set up
3. Check if PM2 is running your application: `pm2 status`
4. Check application logs: `pm2 logs interpipe-api`