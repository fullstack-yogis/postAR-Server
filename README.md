# postAR - an Overview

This is the deployed version of our server. The [front-end](https://github.com/fullstack-yogis/postAR) can be installed and run locally. There is an instance of the server running on heroku at https://postit-server.herokuapp.com.

This repository contains the back end source code, built using GraphQL Yoga server, Prisma Client, and connecting to Prisma Server.

If you would like to run the server locally, please follow the directions

# Prerequisites

1. Any computer with command line access. The instructions are specificially MacOS but can be modified for other platforms
2. A [Prisma Server](https://www.prisma.io/) account. You can sign up for free on their website

# Installation

Follow the installation guide below to set up and run this source code locally on Mac.

## Clone Repo

```
git clone https://github.com/fullstack-yogis/postAR-Server
```

## Install and setup dependencies

```
cd postAR-Server
npm install
```

## Create the secrets.js file in your root folder

```
touch secrets.js
```

## Enter the following line inside the file

```
process.env.APP_SECRET = 'Some Secret';
```

Enter any secret phrase in place of 'Some Secret' to be used for salting your encrypted password.

# Hooking up Prisma Server

This is based on [this graphql prisma server tutorial](https://www.howtographql.com/graphql-js/0-introduction)

1. install the prisma cli globally

```
npm install prisma -g
```

2. reset your prisma.yml file. in /prisma/prisma.yml, remove line 3 and uncomment line 2 to be

```
endpoint: ''
```

this will allow to initiate your own endpoint

3. login to prisma server

```
prisma login
```

4. deploy to prisma

```
prisma deploy
```

select the Demo server. and select any region for the demo server. then hit enter twice to use suggested values for service and stage. Once the command has finished running, the CLI writes the endpoint for the Prisma API to your prisma.yml. It will look similar to this: https://us1.prisma.sh/yogis/postIt/dev

# Start the local server

```
npm run start-dev
```

## Find the IP address of your local machine

```
ifconfig en0
```

You will get an output like the following

```
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
ether 48:bf:6b:df:99:f2
inet6 fe80::140e:813d:ed3f:a5a6%en0 prefixlen 64 secured scopeid 0x5
inet 172.16.21.160 netmask 0xfffffc00 broadcast 172.16.23.255
nd6 options=201<PERFORMNUD,DAD>
media: autoselect
status: active

```

The IP Address you need is what follows after inet, in this case `172.16.21.160`

Your server is now running at http://*your ip address\*:4000
