FROM node:18.16
WORKDIR /StudyBoard
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["node", "./src/server/server.js"]
ENV MONGO_URI='mongodb+srv://garybalogh93:V1wnDWS4nIhYnb5i@cluster0.jxffumi.mongodb.net/?retryWrites=true&w=majority'
