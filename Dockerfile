FROM node:12 AS builder

ADD . /app
RUN cd /app && \
	npm config set registry https://registry.npmmirror.com && \
	npm install && \
	NODE_ENV=production node_modules/.bin/vue-cli-service build

# 创建运行镜像
FROM nginx:1.23-alpine
COPY --from=builder /app/dist /usr/share/nginx/html