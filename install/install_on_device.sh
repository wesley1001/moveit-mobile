#!/bin/bash -e

echo "Getting Device Id..."
COMMAND_OUTPUT=$(ios-deploy --detect)
DEVICE_ID=$(echo $COMMAND_OUTPUT | grep -o "(.*)" | tr -d '()')
echo "$(echo $COMMAND_OUTPUT | grep -o "Found.*'") - ${DEVICE_ID}"
echo
echo "Initiated installation..."
ios-deploy -i $DEVICE_ID --bundle MoveIt.ipa
