#!/bin/sh
# Task Runner

# To make this file runnable:
#     $ chmod +x *.sh.command

projectHome=$(cd $(dirname $0); pwd)
webPage=web-target/dist/index.html

setupTools() {
   # Check for Node.js installation and download project dependencies
   cd $projectHome
   pwd
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install
   npm update
   npm outdated
   echo
   }

runSpecs() {
   cd $projectHome
   echo "Specifications:"
   npm test
   echo
   }

openWebPage() {
   echo "Opening:"
   echo "file://$projectHome/$webPage"
   sleep 2
   open $webPage
   echo
   }

echo
echo "DataDashboard"
echo "============="
setupTools
runSpecs
openWebPage
