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
UPLOAD_MAX_SIZE="10485760" # 10MB in bytes
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
    server_name api.interpipe.co.zw;
    client_max_body_size 10M; # Allow upload sizes up to 10MB

    location / {
        # CORS handling with dynamic origin
        set $cors_origin "";
        if ($http_origin ~ '^https://(admin|www)\.interpipe\.co\.zw$') {
            set $cors_origin $http_origin;
        }

        add_header 'Access-Control-Allow-Origin' $cors_origin always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Max-Age' 1728000 always;
        add_header 'Vary' 'Origin' always;
        
        # Handle preflight requests with dynamic origin
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' $cors_origin always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Max-Age' 1728000 always;
            add_header 'Vary' 'Origin' always;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
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

## Set Up SSL with Let's Encrypt

For secure HTTPS connections, it's strongly recommended to set up SSL certificates using Let's Encrypt:

```bash
# Install Certbot and the Nginx plugin
apt update
apt install -y certbot python3-certbot-nginx

# Obtain and automatically configure SSL certificates
certbot --nginx -d api.interpipe.co.zw
```

Follow the prompts from Certbot. It will:
1. Ask for your email address
2. Ask you to agree to the terms of service
3. Update your Nginx configuration automatically
4. Set up automatic renewal of certificates

After Let's Encrypt setup, your final Nginx configuration should look similar to this:

```
server {
    server_name api.interpipe.co.zw;
    client_max_body_size 10M; # Allow upload sizes up to 10MB

    location / {
        # CORS handling with dynamic origin
        set $cors_origin "";
        if ($http_origin ~ '^https://(admin|www)\.interpipe\.co\.zw$') {
            set $cors_origin $http_origin;
        }

        add_header 'Access-Control-Allow-Origin' $cors_origin always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Max-Age' 1728000 always;
        add_header 'Vary' 'Origin' always;
        
        # Handle preflight requests with dynamic origin
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' $cors_origin always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Max-Age' 1728000 always;
            add_header 'Vary' 'Origin' always;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/api.interpipe.co.zw/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.interpipe.co.zw/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = api.interpipe.co.zw) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name api.interpipe.co.zw;
    return 404; # managed by Certbot
}
```

To verify your certificates are properly configured, you can test with:

```bash
curl -I https://api.interpipe.co.zw
```

You should see a response with `HTTP/2 200` or similar.

## Troubleshooting

If your deployment fails:

1. Check the GitHub Actions logs for errors
2. Verify that your SSH key has been properly set up
3. Check if PM2 is running your application: `pm2 status`
4. Check application logs: `pm2 logs interpipe-api`

### Common Upload Issues

If you encounter issues with file uploads:

1. **413 Request Entity Too Large**: This means Nginx is blocking large uploads.
   - Verify that `client_max_body_size 10M;` is in your Nginx configuration
   - Restart Nginx: `systemctl restart nginx`

2. **CORS Errors**: If your admin interface cannot upload files due to CORS:
   - Check that the origin domain is included in the Nginx CORS configuration
   - Verify that appropriate CORS headers are being sent
   - Check browser console for specific CORS error messages

3. **Upload Size Limits**: If Express is limiting upload sizes:
   - Verify `UPLOAD_MAX_SIZE` is set correctly in your .env file
   - Check that both Express and Nginx configurations match

## Persisting Uploaded Files

The application stores uploaded files in the `/uploads` directory. To ensure these files persist across deployments, the CI/CD pipeline is configured to:

1. Keep the uploads directory outside the deployment cycle
2. Use a permanent uploads directory at `/var/www/interpipe-api/uploads`
3. Symlink this directory to each release

This setup ensures that all uploaded files remain available even after new deployments.

### Manual Setup (If Needed)

If you need to manually configure the uploads directory persistence:

```bash
# SSH into your server
ssh root@YOUR_DROPLET_IP

# Create a permanent uploads directory
mkdir -p /var/www/interpipe-api/uploads

# Ensure appropriate permissions
chmod 755 /var/www/interpipe-api/uploads

# If you have existing uploads in the current deployment, move them to the permanent directory
cp -r /var/www/interpipe-api/current/uploads/* /var/www/interpipe-api/uploads/

# Create a symlink in the current deployment
cd /var/www/interpipe-api/current
rm -rf uploads
ln -s /var/www/interpipe-api/uploads uploads
```