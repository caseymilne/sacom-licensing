# Saber Commerce Licensing Technical Documentation

## Component Summary

This plugin provides 1 component, Licensing.

## Database Tables

Licensing component installs 2 DB tables, "sacom_license", "sacom_license_key".

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

### React Components

#### LicenseKeyForm
Functional component. Provides the form for key management.
