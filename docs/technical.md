# Saber Commerce Licensing Technical Documentation

## Component Summary

This plugin provides 1 component, Licensing.

## Database Tables

Licensing component installs 1 DB table, "sacom_license".

## Testing Groups

### Install & Activation

Does the plugin install? Does the plugin activate without errors? Is the DB tables installed/updated on activation?

## Schema Drafts

### License Schema

id_license
title,
description,
id_product,
duration

### License Key Schema

id_license_key
id_license
id_account
license_key
domain
