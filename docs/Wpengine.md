<hr>

### Production Setup:
repo-name: **etshoppe.git**
<br>
configName: **etShoppeWpengineGitKey**
<br>
<br>

### Dev Setup:
repo-name: **etshoppedev.git**
<br>
configName: **etShoppeDevWpengineGitKey**
<br>
<br>

## Git Commands
<hr>

### Add Remote Env
<p>Flow:</p>
```bash
$ git init
$ git remote add production etShoppeWpengineGitKey:production/etshoppe.git
$ git add
$ git commit
$ git push production master
```

<p>Production:</p>

```bash
$ git remote add production etShoppeWpengineGitKey:production/etshoppe.git
```

<p>Dev:</p>

```bash
$ git remote add development etShoppeDevWpengineGitKey:development/etshoppedev.git
```
<br>
<br>

### Push
<p>Interchange: <br>

**Production** / **Staging** / **Development**</p>

```bash
$ git push production master
```
<br>
<br>

## General Commands
<hr>
<p>Create SSH Key</p>

```bash
$ ssh-keygen -t rsa -b 4096 -C "spencer.bigum@gmail.com"
$ more ~/.ssh/github_rsa.pub
```

<br>
<p>Edit config:</p>

```bash
$ nano ~/.ssh/config
```

<br>
<p>Remove from know hosts:</p>

```bash
$ nano ~/.ssh/config
$ ssh-keygen -R git.wpengine.com
```

<br>
<p>Remove key entirely:</p>

```bash
$ rm ~/.ssh/github_rsa.pub
```
