# Full Stack Cloudflare

An example of a full stack application built on Cloudflare.

## Frontend

Remix deployed to Cloudflare Pages.

## Backend

Hono deployed to Cloudflare Workers.

## Backend for Frontend (BFF) Architecture

Use of Hono RPC to communicate between the frontend and backend in a typesafe way

## Deployment

Automate via Github Actions and Wrangler CLI

Push to main branch to deploy to Cloudflare Pages and Workers automatically

Push to PR to deploys App to Cloudflare Pages

# Development

## Package Management

Bun is used as a package manager for the monorepo with workspaces

## Install dependencies

```bash
bun install
```

## Directory Structure

```
/apps
    /remix-app  <-- Remix frontend
    /api        <-- Hono backend
```
