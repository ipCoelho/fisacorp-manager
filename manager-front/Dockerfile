FROM 647314927486.dkr.ecr.us-east-1.amazonaws.com/node:16.4 as build
WORKDIR /app
COPY . .

ARG API_URL

RUN npm install \
    && npm run build \
    && INDEX_JS=`ls dist/assets/index.*.js`; sed -i "s,_API_URL_,${API_URL},g" $INDEX_JS

FROM 647314927486.dkr.ecr.us-east-1.amazonaws.com/nginx:1.0
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

