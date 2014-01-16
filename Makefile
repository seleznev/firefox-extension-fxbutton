all: xpi

xpi:
	cd "extension"; \
	zip -FS -r "../firefox-extension-fxbutton.xpi" *; \
	cd ..

clean:
	rm -f "firefox-extension-fxbutton.xpi"
