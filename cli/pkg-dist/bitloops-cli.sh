#!/usr/bin/env bash

#n general, it's recommended to use #!/usr/bin/env bash for portability across different systems, especially if you're not sure where Bash is installed. 

# The download URL for the executable
URL="https://your-cdn.com/your-executable"

# The path to the executable
EXECUTABLE_PATH="/usr/local/bin/bitloops"

# Check if executable already exists
if [ -f "$EXECUTABLE_PATH" ]; then
    echo "Removing existing executable..."
    sudo rm "$EXECUTABLE_PATH"
fi

# Download the updated executable
echo "Downloading updated executable..."
sudo curl -L $URL -o "$EXECUTABLE_PATH"

# Set the correct permissions for the executable
echo "Setting executable permissions..."
sudo chmod +rx "$EXECUTABLE_PATH"

VERSION=$("$EXECUTABLE_PATH" --version)
# If no version is detected then clearly the binary failed to install for
# some reason, so we'll log out an error message and report the failure
# to headquarters via an analytics event.
if [ -z "$VERSION" ]
then
    echo "Something went wrong, bitloops-cli has not been installed."
    echo "Please file a bug with your system information on Github."
    echo "https://github.com/bitloops/bitloops-language/issues/"

    exit 1
fi

# TODO create a symlink for /usr/local/bin/bl pointing to /usr/local/bin/bitloops

echo "All done!"
