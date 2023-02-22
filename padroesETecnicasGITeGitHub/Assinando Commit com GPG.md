# Assiando Commit com GPG
[Link documentação](https://docs.github.com/pt/authentication/managing-commit-signature-verification/signing-commits)

## Listando as chaves existentes
Esse comando lista todas as chaves criadas pelo gpg
> gpg --list-secret-key --keyid-form LONG

## Criando uma chave RSA
Para podermos assinar algo digitalmente, primeiro precisamos de um certificado digital, então vamos criar um para nos
> gpg --full-fenerate-key

* Escolha RSA
* digite 4096
* digite o tempo e confirme
* digite o nome (o mesmo do git config user.name)
* digite o seu email principal (o mesmo do git config user.email, apenas o email sem formatar)
* agora sim, confirme seu ID altere algo se precisar e confirme digitando O
* digite a senha para esta chave 

## Obter a chave publica
* liste as chaves com o comando acima
> gpg --list-secret-key --keyid-from LONG  
* na linha sec apos a '/' é o id da sua chave
> gpg --armor --export \<id da chave> 
* sua chave é da linha ----- ate o fim; é ela que você vai informar no github e etc

A492B00DD2DFC17E
## Identificando a Chave ao GIT
> git config --global user.signingkey \<id da chave>  
> export GPG_TTY=$(tty)

agora o Git sabe qual chave utilizar, 

## Assiando todos os Commits
use --global para todos e sem --global para o repositorio atual.
>git config [--global] commit.gpgsign true


## Assinando apenas commit especifico
casso você deseje não utilizar globalmente, tambem é possivel utilisar para assinar 1 commit
> git commit -S  ...

