# Estoque de produtos

Atenção: Este é um projeto desenvolvido como trabalho da matéria de Banco de dados do Professor Alexandre Sobrino

### Introdução:
O projeto se trata da demonstração prática dos conceitos aprendidos em aula, com o desafio de implementar um banco de dados em uma aplicação. Como sugestão, o professor nos orientou a fazermos um projeto relacionados a estoque de produtos. 

O nosso projeto conta com 3 pilares: o banco de dados, o servidor e a aplicação mobile (detalhada em outro projeto no github, chamado estoque).

### Banco de dados:



### API:
O servidor faz um papel crucial no projeto: fazer uma "ponte" entre o aplicativo e o banco de dados. Ele conta com uma API, na qual é chamada para cadastrar os registros no banco, os endpoints da api estão listados a seguir:

<table>
    <tbody>
        <tr>
            <td>Açãoo</td>
            <td>Usuário</td>
            <td>Categoria</td>
            <td>Produto</td>
            <td></td>
        </tr>
        <tr>
            <td>criar</td>
            <td>/user/add</td>
            <td>/category/add</td>
            <td>
                <div>
                    <div>/product/add</div>
                </div>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>atualizar</td>
            <td>/user/alterSenha</td>
            <td>/category/alter</td>
            <td>
                <div>
                    <div>/product/alter</div>
                </div>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>apagar</td>
            <td>/user/delete</td>
            <td>
                <div>
                    <div>/category/delete</div>
                </div>
            </td>
            <td>/product/delete</td>
            <td></td>
        </tr>
        <tr>
            <td>login</td>
            <td>/user/login</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

### APLICATIVO:
O app conta com telas de login, cadastro, configurações, tela de produtos e categoria.. e também para cadatrar novos produtos/categorias.
