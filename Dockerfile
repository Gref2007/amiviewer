#Go
FROM golang:1.21.4-alpine3.18 AS gobuild
WORKDIR /usr/src/goapp
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
RUN go build -v -o /usr/local/bin/goapp ./

# node
 FROM node:latest AS nodebuild
 WORKDIR /usr/src/nodeapp
 COPY package.json ./
 RUN npm install
 COPY . .
 RUN npm run build-prod

#Final
FROM alpine:latest
WORKDIR /usr/src/nodeapp 
COPY --from=gobuild /usr/local/bin/goapp /usr/local/bin/goapp
COPY --from=nodebuild /usr/src/nodeapp /usr/src/nodeapp
ENV PORT=80
EXPOSE 80
CMD ["goapp"]