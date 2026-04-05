FROM node:20-alpine3.18

WORKDIR /app

ENV NODE_ENV=production \
        PORT=3001

COPY ./package.json ./app.js ./ 

RUN npm install --production

RUN groupadd -g 1001 -S appgroup && useradd -u 1001 -S -G appgroup appuser

COPY --chown=appuser:appgroup ./app.js ./

EXPOSE 3001

USER appuser

CMD [ "npm" , "start" ]