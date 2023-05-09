#!/usr/bin/env bash

#n general, it's recommended to use #!/usr/bin/env bash for portability across different systems, especially if you're not sure where Bash is installed. 


echo "Checking your machine type..."

# Now we need to detect the platform we're running on (Linux / Mac / Other)
# so we can fetch the correct binary and place it in the correct location
# on the machine.

# We use "tr" to translate the uppercase "uname" output into lowercase
UNAME=$(uname -s | tr '[:upper:]' '[:lower:]')

# Then we map the output to the names used on the Github releases page
case "$UNAME" in
    linux*)     MACHINE=linux;;
    darwin*)    MACHINE=macos;;
    # darwin*)       if [[ $(uname -m) == "arm64" ]]; then MACHINE=macos-arm; else MACHINE=macos-x64; fi;;
esac

# If we never define the $MACHINE variable (because our platform is neither Mac
# or Linux), then we can't finish our job, so just log out a helpful message
# and close.
if [ -z "$MACHINE" ]
then
    echo "Your operating system is not supported, if you think it should be please file a bug."
    echo "https://github.com/bitloops/bitloops-language/issues"
    echo "All done!"

    exit 0
fi


# The download URL for the executable
URL=""
case "$MACHINE" in
    linux) URL="https://github.com/bitloops/bitloops-language/releases/download/v3.0.0-bitloops-cli-beta/bitloops-cli.linux-x64" ;;
    macos) URL="https://github.com/bitloops/bitloops-language/releases/download/v3.0.0-bitloops-cli-beta/bitloops-cli.macos-x64" ;;
esac


# The path to the executable
EXECUTABLE_PATH="/usr/local/bin/bitloops"
ALIAS_EXECUTABLE_PATH="/usr/local/bin/bl"

# Function that uninstall bitloops-cli
uninstall_bitloops() {
    echo "Uninstalling bitloops-cli..."
    sudo rm "$EXECUTABLE_PATH"
    sudo rm "$ALIAS_EXECUTABLE_PATH"
    echo "Done!"
    exit 0
}

# You can run [curl -sL <script-url> | bash -s -- --uninstall] to uninstall
# -- is needed to seperate curl arguments from bash arguments
if [[ $1 == "--uninstall" ]]; then
    uninstall_bitloops
    exit 0
fi

# Check if executable already exists
if [ -f "$EXECUTABLE_PATH" ]; then
    echo "Removing existing executable..."
    sudo rm "$EXECUTABLE_PATH"
    # The symlink will still exist in a broken state, so we remove it as well
    sudo rm "$ALIAS_EXECUTABLE_PATH"
fi

# Download the updated executable
echo "Downloading updated executable..."
sudo curl -L --progress-bar $URL -o "$EXECUTABLE_PATH"

# Set the correct permissions for the executable
echo "Setting executable permissions..."
sudo chmod +rx "$EXECUTABLE_PATH"

VERSION=$("$EXECUTABLE_PATH" --version)
# If no version is detected then clearly the binary failed to install for
# some reason, so we'll log out an error message 
if [ -z "$VERSION" ]
then
    echo "Something went wrong, bitloops-cli has not been installed."
    echo "Please file a bug with your system information on Github."
    echo "https://github.com/bitloops/bitloops-language/issues/"

    exit 1
fi

# Create a symlink for /usr/local/bin/bl pointing to /usr/local/bin/bitloops
sudo ln -s "$EXECUTABLE_PATH" "$ALIAS_EXECUTABLE_PATH"


echo "All done!"
