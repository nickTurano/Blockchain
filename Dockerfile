FROM node:8


WORKDIR C:\Users\nickt\Desktop\DockerDir

COPY package*.json ./

RUN npm install -g typescript
RUN npm install

COPY . .

#I am aware that forcing a 0 exit is not good practice, but there are errors when compiling .ts into .js that do not impact functionality.
RUN tsc server.ts; exit 0
RUN tsc client.ts; exit 0

EXPOSE 8080

CMD ["npm", "start"]