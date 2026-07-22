<?php
declare(strict_types=1);

// LongevityCompetition SDK base feature

class LongevityCompetitionBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LongevityCompetitionContext $ctx, array $options): void {}
    public function PostConstruct(LongevityCompetitionContext $ctx): void {}
    public function PostConstructEntity(LongevityCompetitionContext $ctx): void {}
    public function SetData(LongevityCompetitionContext $ctx): void {}
    public function GetData(LongevityCompetitionContext $ctx): void {}
    public function GetMatch(LongevityCompetitionContext $ctx): void {}
    public function SetMatch(LongevityCompetitionContext $ctx): void {}
    public function PrePoint(LongevityCompetitionContext $ctx): void {}
    public function PreSpec(LongevityCompetitionContext $ctx): void {}
    public function PreRequest(LongevityCompetitionContext $ctx): void {}
    public function PreResponse(LongevityCompetitionContext $ctx): void {}
    public function PreResult(LongevityCompetitionContext $ctx): void {}
    public function PreDone(LongevityCompetitionContext $ctx): void {}
    public function PreUnexpected(LongevityCompetitionContext $ctx): void {}
}
