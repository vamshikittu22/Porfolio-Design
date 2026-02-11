# Skill Icons - Static Assets

All skill/technology icons have been downloaded and stored locally in `/public/icons/` to improve performance and reliability.

## Available Icons (33 total)

### Languages
- java.svg
- python.svg
- typescript.svg
- javascript.svg
- csharp.svg
- php.svg
- c.svg

### Frameworks & Libraries
- spring.svg
- react.svg
- angular.svg
- vuejs.svg
- nodejs.svg
- dotnetcore.svg

### Databases
- postgresql.svg
- mysql.svg
- oracle.svg
- mongodb.svg
- amazondynamodb.svg
- microsoftsqlserver.svg

### Cloud & DevOps
- amazonwebservices.svg
- docker.svg
- apachekafka.svg
- jenkins.svg
- terraform.svg
- googlecloud.svg

### Tools
- git.svg
- github.svg
- vscode.svg
- postman.svg

### Other
- html5.svg
- css3.svg
- linux.svg
- tensorflow.svg

## Source

Icons originally from [Devicon](https://devicons.github.io/devicon/) via CDN.
Now stored locally for:
- ✅ Faster loading (no external requests)
- ✅ Offline support
- ✅ Reliability (no CDN downtime)
- ✅ Consistent display

## Fallback

The `AboutSection.tsx` component includes an `onError` handler that displays a code brackets SVG if any icon fails to load.

## Regenerating Icons

To re-download icons from CDN:
```bash
node download-icons.mjs
```

Note: Some icons (like amazondynamodb, amazonwebservices) may fail from CDN and have been manually created as fallbacks.
