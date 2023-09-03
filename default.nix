with import <nixpkgs> { };
stdenv.mkDerivation {
  name = "liquidzulu.github.io";
  buildInputs = [ ffmpeg treefmt ];
}
