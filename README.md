# gatsby-plugin-cookiehub-banner

Gatsby plugin to use cookie banner generated with cookiehub. This is a fork of
https://github.com/VirtualFox0/gatsby-plugin-cookiehub-banner but with support for
staging environments.

This plugin works in an easy way together with a plugin to add google analytics GDPR compliant: [gatsby-plugin-google-analytics-gdpr](https://github.com/VirtualFox0/gatsby-plugin-google-analytics-gdpr)

## Setup Cookiehub

### Setup Cookiehub v2

* Create [CookieHub](https://dash.cookiehub.com/login) account.
* [Add domain](https://dash.cookiehub.com/domain).
* Configure domain.

### Setup Cookiehub v1

CookieHub v1 which is being phased out. Version 1 is currently sunsetting and will be shut down in May 2021 (EOL plan).

* Create [CookieHub](https://www.cookiehub.com/login) account.
* [Add widget](https://www.cookiehub.com/widgets).
* Configure widget at least with appropriate categories in the category tab.

## Install

`npm install --save gatsby-plugin-cookiehub-banner`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-cookiehub-banner`,
            options: {
                // The ID is part of the CookieHub URL: https://cookiehub.net/cc/YOUR_COOKIEHUB_ID.js
                cookieHubId: "YOUR_COOKIEHUB_BANNER_ID",
                // (Optional) parameter (default true) - Use new v2 API.
                cookieHubV2Api: false,
                // (Optional) see description in docs 
                // stageHosts: ["localhost"],
                // (Optional) see description in docs 
                // stageMode: "demo"
                // Categories configured with CookieHub
                categories: [
                    {
                        categoryName: 'analytics', // Unique id of the category which is set by Cookiehub.
                        cookieName: 'gatsby-plugin-google-analytics-gdpr_cookies-enabled' // Your custom cookie name
                    },
                    {
                        categoryName: 'marketing',
                        cookieName: 'marketing-enabled'
                    }
                ]
            }
        },
    ],
}
```
## How it works
The plugin embeds the script generated by CookieHub to show the cookie banner.
On CookieHub initialization and on user input the plugin sets one cookie per category. Depending on the user input the value should be `true` or `false`.
You can configure your categories in the `gatsby-config.js` with the according cookie names.

Cookie Handling Example:
If you want to integrate Google Analytics, you can start tracking as soon as the analytics cookie is set to `true` and disable tracking if the user withdraws the choice.

There is a GDPR plugin to use Google Analytics in an easy way with this plugin: [gatsby-plugin-google-analytics-gdpr](https://github.com/VirtualFox0/gatsby-plugin-google-analytics-gdpr). Install and configure the `gatsby-plugin-google-analytics-gdpr` plugin and set the analytics category cookie name to `gatsby-plugin-google-analytics-gdpr_cookies-enabled`.

## Options

### `cookieHubId`

The ID is part of the CookieHub URL: https://cookiehub.net/cc/YOUR_COOKIEHUB_ID.js
- CookieHub v1: Your cookiehub widget ID. You can find the widget ID in the CookieHub tab "Your script" of the appropriate widget.
- CookieHub v2: Your cookiehub domain code. You can find the code in the overview tab of your configured domain.

### `cookieHubV2Api`

Optional parameter (default true).

If true the plugin uses the new Cookiehub API v2.

### `stageHosts`

Optional parameter

Array containing hostnames which act as stage environments and where you want a different
behavior of the cookiehub script. The behavior is defined in the 'stageMode' parameter. If
you leave out this param, every request, no matter which host, is treated as production host with regard to cookiehub.
**Dont provide an empty array!**

### `stageMode`

Optional parameter (can be 'demo' *or* 'off'. Defaults to 'demo')

This parameter should only be used when at least one entry in 'stageHosts' is given. If in **demo** mode
the cookiehub demo URL is created. See [StageEnv Info on Cookiehub](https://support.cookiehub.com/hc/en-us/articles/360049072112-Why-does-the-CookieHub-widget-show-up-on-every-page-view-).
In **off** mode, a request to a staging URL results in no script loaded at all. This is useful for
automated visual testing tools (like percy), where you dont want to have the Cookiebanner on each page.  


### `categories`

Define your categories configured with CookieHub. A category consists of `categoryName` and `cookieName`.

#### `categoryName`

Unique id of the category which you can set in CookieHub categories.

#### `cookieName`

Define a custom cookie name. If none cookieName is given, the plugin will generate one.
