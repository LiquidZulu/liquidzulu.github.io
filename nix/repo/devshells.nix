{
  inputs,
  cell,
}: let
  inherit (inputs) std nixpkgs self;
  inherit (std.lib) dev;
  inherit (nixpkgs) lib;
in
  lib.mapAttrs (_: dev.mkShell) {
    default = {
      name = "dev";

      packages = with nixpkgs; [
        # devshell deps
        nodePackages.npm
        git
        gnused
        gnugrep
        nodejs
      ];

      commands = let
        scriptPath = self + "/scripts";
        astro = attrset:
          {
            category = "astro";
          }
          // attrset;
        script = name: attrset:
          {
            inherit name;
            category = "scripts";
            command = scriptPath + "/${name} $@";
          }
          // attrset;
      in
        lib.concatLists [
          [
            {
              category = "scripts";
              name = "lss";
              help = "lists all of the available scripts in ./scripts/*";
              command = ''
                ls ${scriptPath} | sed 's/\x1B\[[0-9;]\{1,\}[A-Za-z]//g' | grep -v .json | xargs whatitdo
              '';
            }
          ]
          (lib.mapAttrsToList (slug: _: script slug {}) (lib.filterAttrs (_: type: type == "regular") (builtins.readDir scriptPath)))
          (builtins.map astro [
            {
              name = "astro";
              help = "the astro cli";
              command = ''npx astro $@'';
            }
            {
              name = "dev";
              help = "run dev server";
              command = ''astro dev $@'';
            }
            {
              name = "host";
              help = "host dev server";
              command = ''dev --host $@'';
            }
          ])
        ];

      nixago = with cell.configs; [
        editorconfig
        treefmt
        #lefthook # this seems to be broken, it might be the fault of using GitHub Desktop rather than something better but I already know how to use GitHub Desktop so idk if I will ever switch this back on.
      ];
    };
  }
