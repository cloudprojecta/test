import os
import sys
from seleniumbase.core import log_helper
from seleniumbase.fixtures import constants

VISUAL_BASELINE_DIR = constants.VisualBaseline.STORAGE_FOLDER
abs_path = os.path.abspath(".")
visual_baseline_path = os.path.join(abs_path, VISUAL_BASELINE_DIR)


def get_visual_baseline_folder():
    return visual_baseline_path


def visual_baseline_folder_setup():
    """Handle Logging"""
    if not os.path.exists(visual_baseline_path):
        try:
            os.makedirs(visual_baseline_path)
        except Exception:
            pass  # Should only be reachable during multi-threaded runs


def get_sbs_head():
    if sys.version_info[0] >= 3:
        # Uses caching to prevent extra method calls
        SIDE_BY_SIDE_PNG = constants.SideBySide.get_favicon()
    else:
        from seleniumbase.core import encoded_images

        SIDE_BY_SIDE_PNG = encoded_images.get_side_by_side_png()
    head = (
        '<head><meta charset="utf-8">'
        '<meta name="viewport" content="shrink-to-fit=no">'
        '<link rel="shortcut icon" href="%s">'
        "<title>Visual Comparison</title>"
        "</head>" % (SIDE_BY_SIDE_PNG)
    )
    return head


def get_sbs_table_row(baseline="baseline.png", diff="baseline_diff.png"):
    row = (
        '<tbody class="compare results-table-row">'
        '<tr style="background-color: #F4F4FE;">'
        '<td><img src="%s" width="100%%" /></td>'
        '<td><img src="%s" width="100%%" /></td>'
        "</tr></tbody>"
        "" % (baseline, diff)
    )
    return row


def get_sbs_table_html(baseline="baseline.png", diff="baseline_diff.png"):
    table_html = (
        '<table border="3px solid #E6E6E6;" width="100%;" padding: 12px;'
        ' font-size="16px;" text-align="left;" id="results-table"'
        ' style="background-color: #FAFAFA;">'
        '<thead id="results-table-head">'
        "<tr>"
        '<th style="background-color: rgba(0, 128, 0, 0.25);"'
        ' col="baseline">Baseline Screenshot</th>'
        '<th style="background-color: rgba(128, 0, 0, 0.25);"'
        ' col="failure">Visual Diff Failure Screenshot</th>'
        "</tr></thead>"
    )
    row = get_sbs_table_row(baseline, diff)
    table_html += row
    table_html += "</table>"
    return table_html


def get_sbs_gen_by():
    gen_by = (
        '<p><div>Generated by: <b><a href="https://seleniumbase.io/">'
        "SeleniumBase</a></b></div></p><p></p>"
    )
    return gen_by


def get_sbs_header_text():
    header_text = "SeleniumBase Visual Comparison"
    return header_text


def get_sbs_header():
    header_text = get_sbs_header_text()
    header = '<h3 align="center">%s</h3>' % header_text
    return header


def get_sbs_footer():
    footer = "<br /><b>Last updated:</b> "
    timestamp, the_date, the_time = log_helper.get_master_time()
    last_updated = "%s at %s" % (the_date, the_time)
    footer = footer + "%s" % last_updated
    gen_by = get_sbs_gen_by()
    footer = footer + gen_by
    return footer


def get_sbs_html(baseline="baseline.png", diff="baseline_diff.png"):
    head = get_sbs_head()
    header = get_sbs_header()
    table_html = get_sbs_table_html(baseline, diff)
    footer = get_sbs_footer()
    the_html = (
        '<html lang="en">'
        + head
        + '<body style="background-color: #FCFCF4;">'
        + header
        + table_html
        + footer
        + "</body>"
    )
    return the_html
