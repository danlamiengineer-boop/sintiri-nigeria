/**
 * Sintiri Nigeria
 * Application Entry Point
 */

"use strict";

const SintiriApp = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            document.documentElement.classList.add("app-ready");
        });
    }
};

SintiriApp.init();
