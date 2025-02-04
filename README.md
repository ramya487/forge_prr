# PRR Bot Forge Application

# Steps to Set up the Development Server

This project uses Forge development platform, that allows developers to build apps for Atlassian products. It makes use of Forge UI-kit, a react-based framework to build the User Interface. So, it is recommended to have a familiarity with react. The following are the steps outlined to set up forge app locally on your machine

## Pre-requisites

1. [**Node.js**](https://nodejs.org/en/download): A JavaScript runtime environment

2. [**NPM**](https://www.npmjs.com/): Node Package Manager to install packages. *Please Note that installing Node.js automatically installs NPM on your machine*

3. [**Git**](https://git-scm.com/downloads): To clone the repository and for Version Control

## Steps

1. First Make sure that the above pre-requisites are installed successfully, by typing the following commands on the command line

```shell
node -v
npm -v
git -v
```

2. Inorder to develop with forge, you require an Atlassian API token. Navigate to this website [```https://id.atlassian.com/manage-profile/security/api-tokens```](https://id.atlassian.com/manage-profile/security/api-tokens) and create an API key. Save it securely for future use

3. Clone the repository

```shell
git clone https://github.com/ramya487/forge_prr
```

4. Navigate to the directory and install the packages

```shell
cd forge_prr
npm install
```

5. Open your terminal and login to forge

```shell
forge login
```
After the execution of the command, you will be asked to enter the credentials: Email and Forge API token

6. Execute the command to set up the environment variables

```shell
forge variables set FORGE_USER_VAR_BACKEND_URL <your-backend-baseurl>
forge variables set -e <environment> BACKEND_URL <your-backend-baseurl>
```
Replace ```<your-backend-baseurl>``` with the url where your FastAPI backend is hosted inorder to make calls to the LLM

Pls Note that, inorder to access environment variables during forge tunnel it is necessary to prefix them as ```FORGE_USER_VAR_``` . You could learn more about setting environment variables in forge in this [link](https://developer.atlassian.com/platform/forge/environments-and-versions/).

Check if variables are set successfully

6. Execute the command to deploy the forge app

```shell
forge deploy
```

7. Execute the command to install the application. You will be required to enter the URL to your bitbucket workspace

```shell
forge install
```
8. Inorder to see the changes made to your application, in real-time for iterative development, make sure to tunnel the application using the command

```shell
forge tunnel
```

9. Navigate to your respective workspace to access the forge app thus installed

10. Inorder to distribute your application, visit the following [link](https://developer.atlassian.com/platform/forge/distribute-your-apps/)