# **Team Diversity**

## **User Resources**
Read our [Wiki](https://github.com/utkarshv1997/cse210-group3/wiki) to learn more about the product, how to install and use it, and the product values the team focused on during development, along with many other useful bits of information!

## **Team Resources**
#### External:
- Design and Ideation: [Miro](https://miro.com/app/board/uXjVPOby01U=/)
- Meeting Minutes + General Tracking: [Google Docs (Meeting Minutes)](https://docs.google.com/document/d/1RGKrrThjOPg6ysAf2UJsC2YN-XTuSoBl-3mAMRo6YU8/edit?usp=sharing)
- User Interface Design: [Figma](https://www.figma.com/file/gCg3oZfmB1QFsluICrPNhy/Diverse-Travel?node-id=0%3A1)
#### Within GitHub:
- Internal Code Documentation: [JS Docs](https://utkarshv1997.github.io/cse210-group3/out/)
- ADRs: [ADRs](https://github.com/utkarshv1997/cse210-group3/tree/main/docs/decisions)
- Architecture Diagrams: [Diagrams](https://github.com/utkarshv1997/cse210-group3/tree/main/docs/diagrams)

## Step-by-Step Guide to install and use the application
- Download the code repository 
```
git clone git@github.com:utkarshv1997/cse210-group3.git
```

- Change working directory to `cse210-group3/src/main`
```
cd cse210-group3/src/main
```

- Install dependencies (Bootstrap | indieFlower font)
```
npm install
```

- Run a server once to host you (example below)
```
python3 -m http.server
or
npm start
```

- On your browser, navigate to localhost:8000 or wherever you directed your server to host the application

- Download the application (from the browser) to ensure the service worker caches everything <br/>

![image](https://user-images.githubusercontent.com/40588977/206608829-5c5e82d6-f4ff-45a5-b163-ca38e4ee65e9.png)

## Tutorial
### Setting up *Linter* on local machine
- ESLint (Javascript)
  * [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  * [Demo](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code)
```
npm install eslint --save-dev
./node_modules/.bin/eslint --init
```

## Unit Test - [Jasmine](https://jasmine.github.io/tutorials/your_first_suite.html)
- running specs/tests

```
npm test
```

- install 
  
`npm install --save-dev jasmine`

- init 
  - project should already be initialized

`npx jasmine init`


## **Members**
- Keerthana Sundaresan
- Katherine Weng
- Fred You
- Grishma Gurbani
- Kailee Madden
- Junqi Ye
- Utkarsh Vashishtha
