# Path configurations
export PATH="$HOME/.local/bin:$PATH"
eval "$(/opt/homebrew/bin/brew shellenv)"
export PATH="$PATH:/Users/andrew/.spicetify"
export PATH="/Applications/Racket v8.11.1/bin:$PATH"


# Terminal colors and prompt setup
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad


# Additional aliases
alias copy="pbcopy"
alias apple="archey -d darwin -l retro"
alias shellCheck="for i in $(seq 1 10); do /usr/bin/time $SHELL -i -c exit; done"


# Manually installed zsh-defer
source ~/.zsh/plugins/zsh-defer/zsh-defer.plugin.zsh


# Oh My Zsh configuration
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"


# Plugin configurations
ENABLE_CORRECTION="true"


# Auto suggest configuration
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=magenta"
ZSH_AUTOSUGGEST_STRATEGY=(history completion)
ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=20


# Plugins configuration
plugins=(
  git
  fzf
  zsh-bat
  zsh-autosuggestions
  zsh-syntax-highlighting
)


# FZF configuration
export FZF_BASE=/opt/homebrew/Cellar/fzf/0.56.3


# Deferred initializations
zsh-defer eval "$(pyenv init -)"
zsh-defer eval "$(zoxide init zsh)"


# Source Oh My Zsh
source $ZSH/oh-my-zsh.sh


# Additional sourcing
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh