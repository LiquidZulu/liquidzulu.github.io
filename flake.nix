{
  description = "Static site for distilled philosophy";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    std = {
      url = "github:divnix/std";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    std-data-collection = {
      url = "github:divnix/std-data-collection";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        std.follows = "std";
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
