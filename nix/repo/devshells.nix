{
  inputs,
  cell,
}: let
  inherit (inputs) std nixpkgs;
  lib = nixpkgs.lib // builtins;
in
  lib.mapAttrs (_: std.lib.dev.mkShell) {
    default = {
      name = "dev";
      commands = [
        {package = nixpkgs.yarn;}
        {
          name = "astro";
          help = "The astro cli";
          command = ''yarn run astro $@'';
        }
        {
          name = "dev";
          help = "Run dev server";
          command = ''astro dev $@'';
        }
        {
          name = "host";
          help = "Host dev server";
          command = ''dev --host $@'';
        }
      ];
      nixago = with cell.configs; [
        editorconfig
        treefmt
        lefthook
      ];
    };
  }
