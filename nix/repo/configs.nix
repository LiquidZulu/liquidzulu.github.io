{
  inputs,
  cell,
}: let
  inherit (inputs) std;
  lib = inputs.nixpkgs.lib // builtins;
  presets = inputs.std-data-collection.data.configs;
in {
  editorconfig = lib.recursiveUpdate presets.editorconfig std.lib.cfg.editorconfig {
    data = {
      "*.{js,jsx,css,md,html,ts,tsx,astro,yaml}" = {
        indent_size = 4;
      };
      "{*.lock,package-lock.json}" = {
        charset = "unset";
        end_of_line = "unset";
        indent_size = "unset";
        indent_style = "unset";
        insert_final_newline = "unset";
        trim_trailing_whitespace = "unset";
      };
    };
  };
  treefmt = std.lib.cfg.treefmt {
    packages = with inputs.nixpkgs; [
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
  lefthook = std.lib.cfg.lefthook {
    data.pre-commit.commands = {
      treefmt = {
        run = "treefmt --fail-on-change {staged_files}";
        skip = ["merge" "rebase"];
      };
    };
  };
}
