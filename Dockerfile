FROM node

COPY . ./opt


WORKDIR /opt/client
RUN npm install vite --save
RUN npm run build
WORKDIR /opt
RUN npm run setup-project

# EXPOSE 5100

CMD npm run dev
# /Downloads/MERN-Jobify-main/MERN-Jobify-main/
