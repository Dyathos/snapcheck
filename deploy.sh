#!/bin/bash

# Variables
REMOTE_USER="fassoprint-snapcheck"
REMOTE_HOST="82.112.240.1"
REMOTE_DIR="/home/fassoprint-snapcheck/public"
REMOTE_PASS="snapcheck@2025"

# Build the project locally
echo "Building project..."
npm run build

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Create a temporary directory for the build
BUILD_DIR=$(mktemp -d)
cp -r .next package.json package-lock.json prisma public node_modules $BUILD_DIR/

# Install sshpass if not already installed
if ! command -v sshpass &> /dev/null; then
    echo "Installing sshpass..."
    brew install sshpass
fi

# Create remote directory and set up environment
echo "Setting up remote environment..."
sshpass -p "$REMOTE_PASS" ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST << 'EOF'
  # Create project directory if it doesn't exist
  mkdir -p $REMOTE_DIR

  # Install Node.js if not installed
  if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi

  # Install PM2 if not installed
  if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
  fi
EOF

# Transfer files to server
echo "Transferring files to server..."
sshpass -p "$REMOTE_PASS" scp -o StrictHostKeyChecking=no -r $BUILD_DIR/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

# Clean up temporary directory
rm -rf $BUILD_DIR

# Set up application on server
echo "Setting up application..."
sshpass -p "$REMOTE_PASS" ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST << 'EOF'
  cd $REMOTE_DIR
  npm install
  npx prisma generate
  pm2 restart snapcheck || pm2 start npm --name "snapcheck" -- start
EOF

echo "Deployment completed!"
