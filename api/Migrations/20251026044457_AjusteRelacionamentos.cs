using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AjusteRelacionamentos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "PessoasJuridicas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "PessoasFisicas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PessoasJuridicas_UsuarioId",
                table: "PessoasJuridicas",
                column: "UsuarioId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PessoasFisicas_UsuarioId",
                table: "PessoasFisicas",
                column: "UsuarioId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PessoasFisicas_Usuario_UsuarioId",
                table: "PessoasFisicas",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PessoasJuridicas_Usuario_UsuarioId",
                table: "PessoasJuridicas",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PessoasFisicas_Usuario_UsuarioId",
                table: "PessoasFisicas");

            migrationBuilder.DropForeignKey(
                name: "FK_PessoasJuridicas_Usuario_UsuarioId",
                table: "PessoasJuridicas");

            migrationBuilder.DropIndex(
                name: "IX_PessoasJuridicas_UsuarioId",
                table: "PessoasJuridicas");

            migrationBuilder.DropIndex(
                name: "IX_PessoasFisicas_UsuarioId",
                table: "PessoasFisicas");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "PessoasJuridicas");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "PessoasFisicas");
        }
    }
}
