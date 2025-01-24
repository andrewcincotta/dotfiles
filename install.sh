#!/bin/bash

# dotfiles must mirror file tree of $HOME !!
# Example: ".config/nvim" will symlink to "~/.config/nvim"

# Directory where your dotfiles repository is located
DOTFILES_DIR="$HOME/.dotfiles"

# Directory to back up existing configuration files/directories
BACKUP_DIR="$HOME/dotfiles_backup"

# List of files to symlink
FILES_TO_SYMLINK=(
  ".zshrc"
  ".vimrc"
  ".bashrc"
  ".gitconfig"
  ".tmux.conf"
)

# List of directories to symlink
DIRECTORIES_TO_SYMLINK=(
  ".config/nvim"
  ".config/alacritty"
)

# Function to create symlinks

create_symlink() {
  local SOURCE=$1
  local TARGET=$2

  # Backup existing file/directory if it exists
  if [ -e "$TARGET" ] || [ -L "$TARGET" ]; then
    echo "Backing up existing target: $TARGET"
    mkdir -p "$BACKUP_DIR/$(dirname "$TARGET")"
    mv "$TARGET" "$BACKUP_DIR/$(dirname "$TARGET")/"
  fi

  # Create the symlink
  echo "Creating symlink: $SOURCE -> $TARGET"
  ln -s "$SOURCE" "$TARGET"
}

# Ensure backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
  echo "Creating backup directory at $BACKUP_DIR..."
  mkdir -p "$BACKUP_DIR"
fi

# Symlink individual files
echo "Processing files..."
for FILE in "${FILES_TO_SYMLINK[@]}"; do
  SOURCE="$DOTFILES_DIR/$FILE"
  TARGET="$HOME/$FILE"
  create_symlink "$SOURCE" "$TARGET"
done

# Symlink directories
echo "Processing directories..."
for DIR in "${DIRECTORIES_TO_SYMLINK[@]}"; do
  SOURCE="$DOTFILES_DIR/$DIR"
  TARGET="$HOME/$DIR"
  create_symlink "$SOURCE" "$TARGET"
done

echo "Dotfiles installation complete!"
