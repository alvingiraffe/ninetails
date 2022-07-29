# ninetails
hacktogether code2college hackathon project

## Dependencies
This project runs using [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/) as a package manager.

### Node
To install node, one way that should work on any system is to go to the [node downloads](https://nodejs.org/en/download/) and download the LTS (Long-term support) version of node appropriate for your system. It's currently tested with node 16.16.0.

If you're on Mac or using WSL (Windows Subsystem for Linux), yo may prefer to install [nvm](https://github.com/nvm-sh/nvm) following the [installation instructions](https://github.com/nvm-sh/nvm#install--update-script). This tool can be used to easily install multiple versions of node and switch between them.

### Yarn
After installing node, you can follow [these instructions](https://yarnpkg.com/getting-started/install) to install yarn.

Note: this is the new suggested method, but it's also different from any way I've installed it in the past so if you have trouble reach out.

### Code dependencies
After the above software is installed, you can run
```
yarn install
```

to install all additional code dependencies needed to run the application.

## Running the UI

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
