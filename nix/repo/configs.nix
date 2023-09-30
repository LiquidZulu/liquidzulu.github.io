{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs;
in {
  editorconfig = {
    hook.mode = "copy";
    data = {
      root = true;

      "*" = {
        charset = "utf-8";
        end_of_line = "lf";
        indent_size = 4;
        indent_style = "space";
        insert_final_newline = true;
        trim_trailing_whitespace = true;
      };

      "*.nix" = {
        indent_size = 2;
      };

      "*.md" = {
        max_line_length = "off";
        trim_trailing_whitespace = false;
      };

      "{*.lock,package-lock.json}" = {
        charset = "unset";
        end_of_line = "unset";
        indent_size = "unset";
        indent_style = "unset";
        insert_final_newline = "unset";
        trim_trailing_whitespace = "unset";
      };

      "{LICENSES/**,LICENSE}" = {
        charset = "unset";
        end_of_line = "unset";
        indent_size = "unset";
        indent_style = "unset";
        insert_final_newline = "unset";
        trim_trailing_whitespace = "unset";
      };
    };
  };

  treefmt = {
    packages = with nixpkgs; [
      alejandra
      nodePackages.prettier
    ];
    data.formatter = {
      nix = {
        command = "alejandra";
        includes = [
          "*.nix"
        ];
      };
      prettier = {
        command = "prettier";
        options = ["--plugin" "prettier-plugin-astro" "--write"];
        includes = [
          "*.css"
          "*.html"
          "*.js"
          "*.json"
          "*.jsx"
          "*.md"
          "*.mdx"
          "*.scss"
          "*.ts"
          "*.yaml"
          "*.astro"
        ];
      };
    };
  };

  lefthook = {
    data.pre-commit.commands = {
      treefmt = {
        run = "treefmt --fail-on-change {staged_files}";
        skip = ["merge" "rebase"];
      };
    };
  };
}
