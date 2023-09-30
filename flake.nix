{
  description = "Static site for distilled philosophy";
  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1.0.tar.gz";

    devshell.url = "github:numtide/devshell";
    nixago.url = "github:nix-community/nixago";
    nixago.inputs.nixpkgs.follows = "nixpkgs";
    std = {
      url = "github:divnix/std";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        devshell.follows = "devshell";
        nixago.follows = "nixago";
      };
    };
  };

  outputs = {
    std,
    self,
    ...
  } @ inputs:
    std.growOn {
      inherit inputs;
      cellsFrom = ./nix;
      cellBlocks = with std.blockTypes; [
        (devshells "devshells")
        (nixago "configs")
      ];
    }
    {
      devShells = std.harvest self ["repo" "devshells"];
    };
}
