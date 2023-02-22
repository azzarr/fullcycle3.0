# Assiando Commits com SSH
[Documentação git hub](https://docs.github.com/pt/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)


## Verificando a Existencia de chaves 
>ls -al ~/.ssh

se existir arquivos .rsa e .rsa.pub, você ja tem uma chave

## Criar uma Chave ssh
> ssh-keygen -t ed25519 -C "your_email@example.com"

ou
> ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

ambas sao validas, a primeira é mais segura.  
O procedimento vai iniciar, e um local para salvar os arquivos sera solicitado,\
precisione ENTER para utilizar o padrao

Em seguida digite a senha da chave.

## Anexando a Chave ao SSh-agent
[Documentação github](https://docs.github.com/pt/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)  
Confira se o Agent esta rodando.
>eval "$(ssh-agent -s)"

adiciona a chave
>ssh-add ~/.ssh/\<nome do arquivo>

## Identificando a Chave ao GIT
> git config [--global] gpg.format ssh  
> git config [--global] user.signingkey ~/.ssh/\<nome do arquivo>


## Assiando todos os Commits
use --global para todos e sem --global para o repositorio atual.
>git config [--global] commit.gpgsign true  
>git config [--global] tag.gpgsign true



## Assinando apenas commit especifico
casso você deseje não utilizar globalmente, tambem é possivel utilisar para assinar 1 commit
> git commit -S  ...

## verifique se foi Assinado 
Antes  de dar Push, verifique se o commit foi devidamente assinado
> git log --show-signature -1  

ou  

> git show

## Problemas conhecidos
### gpg.ssh.allowSingnersFile
error: gpg.ssh.allowedSignersFile needs to be configured and exist for ssh signature verification
[Fonte](https://docs.gitlab.com/ee/user/project/repository/ssh_signed_commits/)

1. Crie um arquivo em ~/.ssh/allowed_signers
    > touch ~/.ssh/allowed_signers
2. escreva conforme o modelo abaixo
    ```
     mail@mail.com namespaces="git" <public-key>
     ```
ou via linha de comando
> echo "\$(git config --get user.email) namespaces=\"git\" $(cat ~/.ssh/<MY_KEY>.pub)" >> ~/.ssh/allowed_signers

3. informe o Git do arquivo
> git config [--global] gpg.ssh.allowedSignersFile "~/.ssh/allowed_signers"


[mais erros](https://calebhearth.com/sign-git-with-ssh)
    