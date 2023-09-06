{ inputs, cell, }:
let
  inherit (inputs) std nixpkgs;
  lib = nixpkgs.lib // builtins;
in lib.mapAttrs (_: std.lib.dev.mkShell) {
  default = {
    name = "dev";
    commands = let
      script = { name, help ? null, category ? null }: {
        inherit name help;
        #command = builtins.readFile ./scripts/${name};
      };
    in [
      { package = nixpkgs.yarn; }
      {
        name = "astro";
        help = "the astro cli";
        command = "yarn run astro $@";
      }
      {
        name = "dev";
        help = "run dev server";
        command = "astro dev $@";
      }
      {
        name = "host";
        help = "host dev server";
        command = "dev --host $@";
      }
      {
        name = "lss";
        help = "lists all of the available scripts in ./scripts/*";
        command = ''
          # Say these magic words to print the directory of the project from any of the sub-folders
          DIRENV_LOCATION=$(direnv status | grep -i "loaded rc path" | awk '{print $4}' | xargs dirname)

          ls "$DIRENV_LOCATION/scripts" | sed 's/\x1B\[[0-9;]\{1,\}[A-Za-z]//g' | grep -v .json | xargs whatitdo
        '';
      }
    ];
    nixago = with cell.configs; [
      editorconfig
      treefmt
      #lefthook # this seems to be broken, it might be the fault of using GitHub Desktop rather than something better but I already know how to use GitHub Desktop so idk if I will ever switch this back on.
    ];
  };
}
