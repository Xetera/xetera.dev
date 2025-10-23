{ pkgs,  ... }:

{
  dotenv.enable = true;

  packages = [ pkgs.git ];

  languages.javascript = {
    enable = true;
    corepack.enable = true;
    package = pkgs.nodejs_24;
  };
}
