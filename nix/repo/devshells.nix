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
        help = "The astro cli";
        command = "yarn run astro $@";
      }
      {
        name = "dev";
        help = "Run dev server";
        command = "astro dev $@";
      }
      {
        name = "host";
        help = "Host dev server";
        command = "dev --host $@";
      }
      {
        name = "lss";
        help = "Lists all of the available scripts in ./scripts/*";
        command = ''
          # Say these magic words to print the directory of the project from any of the sub-folders
          DIRENV_LOCATION=$(direnv status | grep -i "loaded rc path" | awk '{print $4}' | xargs dirname)

          ls "$DIRENV_LOCATION/scripts" | sed 's/\x1B\[[0-9;]\{1,\}[A-Za-z]//g' | grep -v .json | xargs whatitdo
        '';
      }
      #(script {
      #  name = "get-slug";
      #  help = ''
      #    A utility function for mapping "Barack Obama" → "barack-obama" ‖ EXAMPLE: echo "Barack Obama" | get-slug'';
      #})
      #(script {
      #  name = "minimage";
      #  help =
      #    "A wrapper for ffmpeg that minifies images ‖ EXAMPLE: minimage image1.png imgage2.png ...";
      #})
      #(script {
      #  name = "minimages";
      #  help =
      #    "Minifies all images in public/images with the specified extension ‖ EXAMPLE, minify all .webp's in public/images/thumb: minimages .webp thumb";
      #})
      #(script {
      #  name = "mktestimonial";
      #  help =
      #    "Generates a testimonial file in src/content/testimonials with the specified name ‖ EXAMPLE: mktestimonial Barack Obama";
      #})
      #(script {
      #  name = "rmtestimonial";
      #  help =
      #    "Removes the specified testimonial ‖ EXAMPLE: rmtestimonial barack-obama";
      #})
      #(script {
      #  name = "unlighthouse";
      #  help = "Runs unlighthouse on the public liquidzulu.github.io site.";
      #})
    ];
    nixago = with cell.configs; [ editorconfig treefmt lefthook ];
  };
}
