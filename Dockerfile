FROM node:14-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --production

# COPY . .

# EXPOSE 8080

#---------------------
# Create app directory
# WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# RUN npm install 
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . .

# EXPOSE 8080
# CMD [ "node", "server.js" ]
#---------------------


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]