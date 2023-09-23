FROM node:16.15.1-alpine

WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
copy pnpm-lock.yaml ./
# Install dependencies
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm install --save-dev postcss-import
COPY socket-server-team-chat/package*.json ./
RUN npm install
# Copy the rest of the application code to the container
ARG REACT_APP_HOSTBACKEND_URL

COPY . .

# Build the production version of the application
ENV NODE_ENV=production
RUN pnpm build

RUN ls
# Expose port 80 to the outside world
EXPOSE 5173
# Run the command to start the server


CMD ["ls","dist"]
CMD ["pnpm","build"]
CMD ["pnpm", "preview"]
CMD ["node","socket-server-team-chat/server.js"]
#ENTRYPOINT ["node", "src/main.jsx"]