create database db_sistema;
use db_sistema;
--tables
create table tb_produto ( cd_produto int not null primary key identity(1,1), nm_produto varchar(40) not null, vl_produto_atual float(7), qt_produto_min int not null, qt_produto_atual int not null, fk_categoria smallint not null, constraint fk_categoria FOREIGN KEY (fk_categoria) references tb_categoria(cd_categoria) );
create table tb_categoria ( cd_categoria smallint not null primary key identity(1,1), nm_categoria varchar(40) not null );
create table tb_usuario ( cd_usuario int not null primary key identity(1,1), nm_usuario varchar(40), cd_senha varchar(12) not null, nm_email varchar(40) not null );
create table tb_transacao ( cd_transacao int not null primary key identity(1,1), dt_transacao date, fk_operacao int not null, constraint fk_operacao foreign key(fk_operacao) references tb_operacao(cd_operacao) );
create table tb_operacao ( cd_operacao int not null primary key identity(1,1), nm_operacao varchar(40) );
create table item_produto_transacao ( fk_produto int not null, fk_transacao int not null, qt_produto int not null, vl_preco_vendido float not null, constraint fk_produto foreign key (fk_produto) references tb_produto(cd_produto), constraint fk_transacao foreign key (fk_transacao) references tb_transacao(cd_transacao) );

--usuario
CREATE PROCEDURE sp_Login @NomeEmail varchar(40), @SenhaUsuario varchar(12) as if((select count(cd_usuario) from tb_usuario where nm_email = @NomeEmail and cd_senha = @SenhaUsuario)=1)  begin print 'Usuario Entrou'; end else print 'Usuario Incorreto';
CREATE PROCEDURE sp_addUsuario @Nome varchar (40), @Senha varchar (40), @Email varchar (12) as if((select count(nm_email) from tb_usuario where nm_email = @Email)>0) begin print 'Usuario Existente' end else if(@Email = '') begin print 'Email nao pode ser vazio' end else begin insert into tb_usuario values (@Nome,@Senha,@Email) print 'Usuario Cadastrado' end;
CREATE PROCEDURE sp_DeleteUsuario @Email varchar(40) as delete from tb_usuario where nm_email = @Email; 
CREATE PROCEDURE sp_AlterSenha @Email varchar(40), @SenhaAntiga varchar(40), @SenhaNova varchar(40) as update tb_usuario set cd_sen = @SenhaNova where cd_senha = @SenhaAntiga and nm_email = @Email; 
CREATE PROCEDURE sp_SelectUsuario @NomeEmail varchar(40), @SenhaUsuario varchar(12) as select * from tb_usuario where nm_email = @NomeEmail and cd_senha = @SenhaUsuario ;
--categoria
CREATE PROCEDURE sp_AddCategoria @NomeCategoria varchar(40)='' as if((select count(nm_categoria) from tb_categoria where nm_categoria = @NomeCategoria)>0) begin print 'Categoria Existente' end else begin insert into tb_categoria values(@NomeCategoria); print 'Categoria Adcionada' end;
CREATE PROCEDURE sp_AlterCategoria @NomeAntigo varchar(40), @NomeNovo varchar(40) as update tb_categoria set nm_categoria = @NomeNovo where nm_categoria = @NomeAntigo;
CREATE PROCEDURE sp_DeleteCategoria @Nome varchar(40) as delete from tb_categoria where nm_categoria = @Nome;
CREATE PROCEDURE sp_SelectCategoria @NomeCategoria varchar(40)='' as select * from tb_categoria where nm_categoria = @NomeCategoria;
--produto
CREATE PROCEDURE sp_AddProduto @NomeProduto varchar(40)='', @ValorAtual float= 0, @QtdMinima int = 0, @QtdAtual int = 0, @Categoria int = 0 as if((select count(cd_produto) from tb_produto where nm_produto = @NomeProduto)=0) begin  if(@QtdAtual >= @QtdMinima) begin  insert into tb_produto values (      @NomeProduto,    @ValorAtual,    @QtdMinima,    @QtdAtual,    @Categoria )   print 'Produto Adcionado'     end     else begin print 'O valor Atual não pode ser menor que o Minimo' end  end  else begin print 'Produto ja adcionado'  end;
CREATE PROCEDURE sp_AlterProduto @codigoProduto int, @NomeProduto varchar(40)='', @ValorAtual float=' ', @QtdMinima int =' ', @QtdAtual int =' ', @Categoria int =' ', @Imagem varbinary(max) = null as update tb_produto set nm_produto = @NomeProduto, vl_produto_atual = @ValorAtual, qt_produto_min = @QtdMinima, qt_produto_atual = @QtdAtual, fk_categoria=@Categoria, im_produto = @Imagem where cd_produto = @codigoProduto;
CREATE PROCEDURE sp_DeleteProduto @codigoProduto int as delete tb_produto where cd_produto = @codigoProduto;
CREATE PROCEDURE sp_SelectProduto @NomeProduto varchar(40)=' ', @ValorAtual float=' ', @QtdMinima int =' ' as select * from tb_produto where nm_produto = @NomeProduto, vl_produto_atual = @ValorAtual, qt_produto_min = @QtdMinima;
--operacaos
CREATE PROCEDURE sp_AddOperacao @NomeOperacao varchar(40) as if((select count(cd_operacao) from tb_operacao where nm_operacao=@NomeOperacao)=0) begin insert into tb_operacao values(@NomeOperacao) end else begin print 'Operacao ja existente' end;
CREATE PROCEDURE sp_AlterOperacao @CodigoOperacao int, @NomeOperacao varchar(40) as update tb_operacao set nm_operacao = @NomeOperacao where cd_operacao = @CodigoOperacao;
CREATE PROCEDURE sp_DeleteOperacao @Codigo int as delete tb_operacao where cd_operacao = @Codigo;
CREATE PROCEDURE sp_SelectOperacao @NomeProduto varchar(40)=' ', @ValorAtual float=' ', @QtdMinima int =' ' as select * from tb_produto where nm_produto = @NomeProduto, vl_produto_atual = @ValorAtual, qt_produto_min = @QtdMinima;
--transaçao
CREATE PROCEDURE sp_Transacao @DataTransacao date, @NomeOperacao int as insert into tb_transacao values (@DataTransacao,(select cd_operacao from tb_operacao where nm_operacao = @NomeOperacao));


CREATE PROCEDURE sp_AttEstoque @QtdProduto int, @idProduto int, @TipoTransacao varchar(20) 
as if(@TipoTransacao = 'compra') 
        begin   
                insert into tb_transacao values ((select getdate()), (select cd_operacao from tb_operacao where nm_operacao = @TipoTransacao));
                update tb_produto set qt_produto_atual = qt_produto_atual + @QtdProduto where cd_produto = @idProduto;
                insert into item_produto_transacao values (@idProduto, (select max(cd_transacao) from tb_transacao), @QtdProduto, (select vl_produto_atual from tb_produto where cd_produto = @idProduto));
        end 
    else 
    begin
        if((select qt_produto_atual from tb_produto where cd_produto = @idProduto) - @QtdProduto > 0) 
            begin
                insert into tb_transacao values ((select getdate()), (select cd_operacao from tb_operacao where nm_operacao = @TipoTransacao));
                update tb_produto set qt_produto_atual = qt_produto_atual - @QtdProduto where cd_produto = @idProduto;
                insert into item_produto_transacao values (@idProduto, (select max(cd_transacao) from tb_transacao), @QtdProduto, (select vl_produto_atual from tb_produto where cd_produto = @idProduto))
            end 
        else 
            begin
                print 'Quantidade indisponível no estoque' 
            end
    end


CREATE PROCEDURE sp_AttEstoque @QtdProduto int, @idProduto int, @TipoTransacao varchar(20)  as if(@TipoTransacao = 'compra')  begin    insert into tb_transacao values ((select getdate()), (select cd_operacao from tb_operacao where nm_operacao = @TipoTransacao)); update tb_produto set qt_produto_atual = qt_produto_atual + @QtdProduto where cd_produto = @idProduto; insert into item_produto_transacao values (@idProduto, (select max(cd_transacao) from tb_transacao), @QtdProduto, (select vl_produto_atual from tb_produto where cd_produto = @idProduto)); end  else  begin if((select qt_produto_atual from tb_produto where cd_produto = @idProduto) - @QtdProduto > 0)  begin insert into tb_transacao values ((select getdate()), (select cd_operacao from tb_operacao where nm_operacao = @TipoTransacao)); update tb_produto set qt_produto_atual = qt_produto_atual + @QtdProduto where cd_produto = @idProduto; insert into item_produto_transacao values (@idProduto, (select max(cd_transacao) from tb_transacao), @QtdProduto, (select vl_produto_atual from tb_produto where cd_produto = @idProduto)) end  else  begin print 'Quantidade indisponível no estoque'  end end;