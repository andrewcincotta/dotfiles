#!/bin/bash

echo "Starting macOS customizations..."

# Confirm before proceeding
read -p "This will modify macOS settings. Do you want to proceed? (y/n): " CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  echo "Customization aborted."
  exit 1
fi

# Smooth Dock Appear/Hide
echo "Adding smooth dock appear/hide..."
defaults write com.apple.dock autohide-delay -float 0 
defaults write com.apple.dock autohide-time-modifier -float 0.5

# Move windows using ctrl + cmd
echo "Adding move windows using ctrl + cmd"
defaults write -g NSWindowShouldDragOnGesture -bool true

# Make hidden apps translucent 
echo "Adding make hidden apps translucent"
defaults write com.apple.Dock showhidden -bool YES;

# Enable dragging windows with trackpad using three-finger drag
echo "Enabling three-finger drag for windows..."
defaults write -g NSWindowShouldDragOnGesture -bool true

killall Dock

echo "macOS customizations applied successfully!"