using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AtualizacaoAtributos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RG",
                table: "PessoasFisicas");

            migrationBuilder.RenameColumn(
                name: "Rua",
                table: "Endereco",
                newName: "Pais");

            migrationBuilder.AddColumn<int>(
                name: "TipoUsuario",
                table: "Usuario",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Endereco",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Logradouro",
                table: "Endereco",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoUsuario",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Endereco");

            migrationBuilder.DropColumn(
                name: "Logradouro",
                table: "Endereco");

            migrationBuilder.RenameColumn(
                name: "Pais",
                table: "Endereco",
                newName: "Rua");

            migrationBuilder.AddColumn<string>(
                name: "RG",
                table: "PessoasFisicas",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
