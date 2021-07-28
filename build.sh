cd trippo
rm -rf node_modules && yarn install --frozen-lockfile
npm run build
cd ../backend
npm ci
rm -rf node_modules && yarn install --frozen-lockfile
