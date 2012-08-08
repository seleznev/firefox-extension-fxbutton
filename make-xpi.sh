#!/bin/bash

cd extension
rm ../firefox-extension-fxbutton.xpi
zip -r ../firefox-extension-fxbutton.xpi *
cd -
