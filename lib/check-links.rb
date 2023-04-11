require 'html-proofer'

opts = {
  disable_external: true,
  checks: ['Links'],
  allow_missing_href: true
}

HTMLProofer.check_directory(ARGV[0], opts).run
